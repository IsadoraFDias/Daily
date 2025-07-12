export function formatTime(time: number): string {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours.toString().padStart(1, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function formatInputTime(input: string): string {
  const sanitizedInput = input.replace(/[^0-9]/g, "");

  const paddedInput = sanitizedInput.padStart(6, "0");

  const hours = parseInt(paddedInput.slice(0, 2), 10);
  const minutes = parseInt(paddedInput.slice(2, 4), 10);
  const seconds = parseInt(paddedInput.slice(4, 6), 10);

  return `${hours.toString().padStart(1, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export function convertTimeToSeconds(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}