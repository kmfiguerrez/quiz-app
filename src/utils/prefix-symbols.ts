

type TUsage = "letters" | "decimals"

const getPrefixSymbols = (usage: TUsage, index: number): string => {
  const letters: Array<string> = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
    'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z'
  ]
  const decimals = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  // If usage is for decimals.
  if (usage === "decimals") return decimals[index].toString()

  // If usage is for letters.
  return letters[index]

}

export default getPrefixSymbols