import { NextResponse } from "next/server";

type TtsReq = {
  text: string;
  voiceId?: string;
};
type ElevenVoice = {
  voice_id: string;
};

const ELEVEN_API = "https://api.elevenlabs.io/v1/text-to-speech";
const ELEVEN_VOICES_API = "https://api.elevenlabs.io/v1/voices";
const DEFAULT_MODEL = process.env.ELEVENLABS_MODEL_ID ?? "eleven_multilingual_v2";
const DEFAULT_VOICE = process.env.ELEVENLABS_VOICE_ID ?? "";

async function resolveVoiceId(apiKey: string, requestedVoiceId?: string) {
  const requested = (requestedVoiceId ?? "").trim();
  if (requested) return requested;
  if (DEFAULT_VOICE.trim()) return DEFAULT_VOICE.trim();

  const voicesRes = await fetch(ELEVEN_VOICES_API, {
    method: "GET",
    headers: {
      "xi-api-key": apiKey,
      accept: "application/json",
    },
    cache: "no-store",
  });
  if (!voicesRes.ok) return "";

  const voicesJson = (await voicesRes.json()) as { voices?: ElevenVoice[] };
  return (voicesJson.voices?.[0]?.voice_id ?? "").trim();
}

export async function POST(req: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "ELEVENLABS_API_KEY is not configured." }, { status: 500 });
  }

  const body = (await req.json()) as TtsReq;
  const text = (body.text ?? "").trim().slice(0, 1200);
  const voiceId = await resolveVoiceId(apiKey, body.voiceId);

  if (!text) return NextResponse.json({ error: "Text is required." }, { status: 400 });
  if (!voiceId) return NextResponse.json({ error: "Voice ID is required." }, { status: 400 });

  const elevenRes = await fetch(`${ELEVEN_API}/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "content-type": "application/json",
      accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: DEFAULT_MODEL,
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.8,
        style: 0.2,
        use_speaker_boost: true,
      },
    }),
  });

  if (!elevenRes.ok) {
    const msg = await elevenRes.text();
    return NextResponse.json(
      { error: `ElevenLabs request failed (${elevenRes.status}): ${msg}` },
      { status: 502 },
    );
  }

  const bytes = await elevenRes.arrayBuffer();
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      "content-type": "audio/mpeg",
      "cache-control": "no-store",
    },
  });
}
