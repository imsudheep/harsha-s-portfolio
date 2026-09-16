/* ==========================================================================
   FOLIO OFFICE - OPTIONAL WRITING ASSISTANCE SERVICE
   ========================================================================== */

/**
 * Intelligent text transformations for document editing.
 * Operates strictly on user request without auto-triggering.
 */
export function improveText(text, actionType) {
  if (!text || !text.trim()) return text;

  const cleaned = text.trim();

  switch (actionType) {
    case 'fix_grammar':
      return fixGrammar(cleaned);
    case 'make_professional':
      return makeProfessional(cleaned);
    case 'make_clearer':
      return makeClearer(cleaned);
    case 'shorten':
      return shortenText(cleaned);
    case 'expand':
      return expandText(cleaned);
    case 'rewrite':
      return rewriteText(cleaned);
    default:
      return cleaned;
  }
}

function fixGrammar(text) {
  let result = text
    .replace(/\bi\b/g, 'I')
    .replace(/\b(im|i'm)\b/gi, "I'm")
    .replace(/\b(cant|can't)\b/gi, "can't")
    .replace(/\b(dont|don't)\b/gi, "don't")
    .replace(/\b(wont|won't)\b/gi, "won't")
    .replace(/\s+/g, ' ');
  // Ensure capital first letter
  return result.charAt(0).toUpperCase() + result.slice(1);
}

function makeProfessional(text) {
  let t = fixGrammar(text);
  t = t.replace(/thanks/gi, 'Thank you');
  t = t.replace(/hey|hi/gi, 'Dear');
  t = t.replace(/stuff|things/gi, 'deliverables');
  t = t.replace(/cool|great/gi, 'exceptional');
  t = t.replace(/got it|sure/gi, 'We confirm receipt and acknowledge');
  return t;
}

function makeClearer(text) {
  let t = fixGrammar(text);
  t = t.replace(/\b(in order to)\b/gi, 'to');
  t = t.replace(/\b(at this point in time)\b/gi, 'currently');
  t = t.replace(/\b(due to the fact that)\b/gi, 'because');
  t = t.replace(/\b(with regard to)\b/gi, 'regarding');
  return t;
}

function shortenText(text) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  if (sentences.length <= 1) return text;
  // Keep key sentences
  return sentences.slice(0, Math.ceil(sentences.length / 2)).join(' ');
}

function expandText(text) {
  let t = fixGrammar(text);
  if (!t.endsWith('.')) t += '.';
  return t + ' Please do not hesitate to reach out if you have any questions or require further clarification regarding these details.';
}

function rewriteText(text) {
  let t = makeProfessional(text);
  return `Please review the following details:\n\n${t}\n\nWe remain committed to delivering the highest standard of execution for your project.`;
}
