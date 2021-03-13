import classes from "./Button.module.css";

export default function Button(props) {
  return (
    <div className={classes.wrapper}>
      <button className={classes.btn}>{props.children}</button>
    </div>
  );
}
