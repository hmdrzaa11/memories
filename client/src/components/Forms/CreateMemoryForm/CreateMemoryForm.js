import { useEffect, useState } from "react";
import Input from "../../Input/Input";
import ButtonLoading from "../../ButtonLoading/ButtonLoading";

export default function CreateMemoryForm(props) {
  let [formState, setFormState] = useState(() => {
    return props.fields.reduce((initialState, currentField) => {
      initialState[currentField.name] = "";
      return initialState;
    }, {});
  });
  let [image, setImage] = useState(null);

  let { memory, fields } = props;

  //********** Set Initial Value in case of update ********* */
  useEffect(() => {
    if (!memory) return;
    let initialValues = {};
    fields.forEach((field) => {
      if (field.name !== "image") {
        initialValues[field.name] = memory[field.name];
      }
    });
    setFormState(initialValues);
  }, [memory, fields]);
  let onInputChange = (e) => {
    setFormState((preState) => {
      return {
        ...preState,
        [e.target.name]: e.target.value,
      };
    });
  };
  let renderInputs = props.fields.map((field) => {
    if (field.name === "image") {
      return (
        <Input
          key={field.name}
          type="file"
          placeholder={field.placeholder}
          onChange={(e) => setImage(e.target.files[0])}
          name="image"
          imageSrc={memory ? memory.image : ""}
        />
      );
    } else {
      return (
        <Input
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
          onChange={onInputChange}
          name={field.name}
          value={formState[field.name]}
        />
      );
    }
  });
  let handleFormSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    props.fields.forEach((field) => {
      if (field.name === "image" && image) {
        formData.append("image", image);
      } else {
        formData.append(field.name, formState[field.name]);
      }
    });
    if (!image) {
      formData.delete("image");
    }
    props.onFormSubmit(formData);
  };

  let renderButtonText = () => {
    if (props.isLoading) {
      return <ButtonLoading />;
    } else {
      return props.formHeader === "Create a Memory"
        ? "Create a Memory"
        : "Update A Memory";
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-header">{props.formHeader}</h2>
      <form className="form" onSubmit={handleFormSubmit}>
        {renderInputs}
        <div className="submit-wrapper">
          <button className="btn primary">{renderButtonText()}</button>
        </div>
      </form>
    </div>
  );
}
