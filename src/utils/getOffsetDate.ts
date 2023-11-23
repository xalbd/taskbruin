export default function offsetDate(offset: number) {
  const date = new Date();
  date.setDate(date.getDate() + offset);

  return date.toISOString().split("T")[0];
}
