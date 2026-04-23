export default function Checkbox({ text, isChecked }) {
  return (
    <>
        <div>{text} {isChecked ? "(Done)" : "(Not Done)"}</div>
    </>
  );
}