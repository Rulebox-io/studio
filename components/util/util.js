/**
 * Returns a tag name for a type or rule set. This is the unique identifier
 * for the type or rule set.
 * @param {string} displayName The display name of a type or rule set.
 * @returns The tag name for the type or rule set.
 */
export const createTagName = (displayName) => {
  if (!displayName) return displayName
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}
