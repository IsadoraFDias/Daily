export function formatTime(time: number): string{
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

export function formatInputTime(input: string): string{
    const timeInSeconds = parseInt(input, 10);
    if (isNaN(timeInSeconds) || timeInSeconds < 0) {
      return "00:00";
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

