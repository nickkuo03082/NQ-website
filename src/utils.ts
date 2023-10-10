import { ICategory } from "@/services/interface";

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength - 3) + "...";
  }
}
export function truncateTexSearch(
  text: string,
  maxLength: number,
  highlightText: string
): string {
  const ellipsis = "...";

  if (text.length <= maxLength) {
    return text;
  }

  const highlightIndex = text.indexOf(highlightText);

  if (highlightIndex === -1) {
    return text.slice(0, maxLength - ellipsis.length) + ellipsis;
  }

  const halfMaxLength = Math.floor((maxLength - ellipsis.length) / 2);
  const startIdx = Math.max(0, highlightIndex - halfMaxLength);
  const endIdx = Math.min(
    text.length,
    highlightIndex + highlightText.length + halfMaxLength
  );

  let truncatedText = "";

  if (startIdx > 0) {
    truncatedText += ellipsis;
  }

  truncatedText += text.slice(startIdx, endIdx);

  if (endIdx < text.length) {
    truncatedText += ellipsis;
  }

  return truncatedText;
}

export const generateUniqueId = () => {
  const array = new Uint32Array(2);
  crypto.getRandomValues(array);
  const timestamp = new Date().getTime();
  const randomNumber = array[0] % 10000;
  return `${timestamp}-${randomNumber}`;
};

export const formatDate = (inputDate: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date: Date = new Date(inputDate);
  return date.toLocaleDateString("en-US", options);
};

export function findFirstCategory(categories: ICategory[]): string | null {
  for (const category of categories) {
    if (category.category_parent !== 0) {
      return category.name;
    }
  }

  if (categories.length > 0) {
    return categories[0].name;
  }
  return null;
}

export const blurPlaceholder = () =>
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAFXAooDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECBAMF/8QAFhABAQEAAAAAAAAAAAAAAAAAAAER/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD4oD6D54AAAAAIAKACAqAKAAAAAAioAAAAAioiiKgACKgAqIqICKiKgCKiKiKiKiKiVUqNIioijLTLKlRaiNIioyqIqJVAGVAFRQFFVFVFVFaQVFVlQFFVFVAARQFRQAAAAAdYD0OAAAAAAAAIAAAAAAogCoAAAAAAAogICKgAIigIKIqICKiKgIiiKiKiKiKiKlRpEVEUZVGVSgI0iKjKoioyoAigAigNCqiqiqitIKiqigKigCKAqKAoKiiAAAAOoB6HAAAVAFEAUAAAAAQAAAAAAAAAFEBABAABRAQEVEUQBUARURUQQBGkRURURURURURURajKoCI0gDKoioyoAigAKIrSKqKqCoqoqorSCoqooiiKIqooigAKiiAKADqAehwAAAAAAAAAAUQBRAFEAUQBUAABAEAABRAQAQUBEAERRFQUQEVEVEVARFEVEVEVGVRFRGkRURURUZURUZUARQABUVUVWVaRVRVRQFRVQVFVBUVUFFAEURVAAAAHUA7uAAAACiAKIKiiAKIoACAAACAogKAAAgKgIAIKAIICCgCKgIgIqIogiKIqIqIqIogI0iKiKiKjKoioiiKjKiAiioAqoqoKitIoiqiqiqgqKooiqiiKIKgooiiAAKIKOsQd3BRAFEAUQBRAFEAUAAAAAAQBRAABABBVEAARBUEFAEBAFEERQERRFRFQERRARURURURURRBGVEVGVQERQBFAAURQURWkVUGkaEVUURVRRFEURVBUBFEVQABRAHWIO7gogCiAKIAogCiAKIAogCiAKIAogAAACIKgCggACIqoACCIoCIAIiiKgogIqIqIogjKiAioiojSAjNURUZUAAEUAAFVlVRVRWkURVFEVUURVRRFEFQUURQAAAFHUA7uAAAqAKIAogCiAiiAKIAogKogCoCAAAIAAiKogACAAiKAiKAgAIiiKiKICKgIiiAioioioCMqIIzVARFAFUAAVBEVUFFVBUaEFRoRVFEFRoQVFVAFEFFEBFAB1AO7gAAAAAAAAAAogCiAAAAAoCAoggqAAIAqAiggAIIoCAAiKAiKIqIogCoCMggIqIqI0IIzVEBlRAVQEBRAFEAUAFEURVZVUVWVaFVlRFVlVRRBRVQBRARRAHWIO7gogCiAKIAogCiAKIAogCiAKIAogKAAAiCiAAIKqAgIAoCIAgiggKICAgiKAiKIIiiKjKoiozWhAFEAAAAAAAAAFEAVWVBVZVUaGVVFVlVFEFRoQBRAFEAdgg9DzqIAogCiAKIAoggogCiAKIAogAAKAgKIIAICiAoCIKggqoCAgIogAIIigIiiAiiCIogjNaEERVQAAAAAAAAAAAAAAAFQBVZVRVZNXUaE01RoTTRF0QBRAHYA9DzgAAAAAAAAAACAAAIAogCiAKICgCAIAqAAIIoCAAiKqCCgIgAiKICKIIiiCM2qIIjQAAAAAAAAAAAAAAAAAAAAAAACiAKrKrooguiiBqO0Qeh51EAUQBRAFEAUQBRBBRAFEAUQBRAFQABAVUBABAVARQEABEUBAARFEBFEEqKIJWbWhBEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB2CK9LzgAAACoIKIAogCiAKIAogAAAAAAACAqAigICoACAigIiggAgIogiKIJWbWioIigAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsQd3BRAFEAUQBRFAAAAAVAFEAUQBUAAAAEBUBAAFEAAQRRAAQEUQRFEKjNqlQRGgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHSA7OIAAACiAKIAoigAAACAAKIAogAAAAKCCAAAioKAiACCiAioipWVSoIjQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoEHVyUQBRAFVAFEAUQBQBBUAUQBRFAAAAAQAAAAEEAFQBFQEARUZVKhURoQBQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHsqDbmogCiAKIoKIKiiKAqAKIogAAAAAAAAAAAAgCgIgAgoioioi1GaqIqIqAKoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD1EF1hQDQVBRRFEUQBQFFEUQABRFUABAAAAAAABFQABFQBFRFQERSsqjKjKorQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD0EEZURQFQNFAVFEVUFRVAAFAEFQUUAAAQAAAAAFQABAQEVEVEVEVEVEaRFRVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAZZAAURQFQVFVBRQFRQAFRVQAAVFUAAABAABFQUAQQABFRFRFRKqIqVGkRUVQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGwGWQABQAABQFRQFQUFBQVAABQUAAABAABAFAEEABAEVEBmqiUBpEBVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf/9k=";
