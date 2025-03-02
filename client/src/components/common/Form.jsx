import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React from "react";
import { Button } from "../ui/button";

const Form = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  function renderInputsByComponentType(i) {
    let element = null;

    const value = formData[i.name] || "";

    switch (i.componentType) {
      case "input":
        element = (
          <Input
            name={i.name}
            placeholder={i.placeholder}
            id={i.name}
            type={i.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [i.name]: event.target.value,
              })
            }
          />
        );
        break;
      case "select":
        element = (
          <Select
            onValueChange={(value) =>
              setFormData({
                ...formData,
                [i.name]: value,
              })
            }
            value={value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={i.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {i.options && i.options.length > 0
                ? i.options.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={i.name}
            placeholder={i.placeholder}
            id={i.id}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [i.name]: event.target.value,
              })
            }
          ></Textarea>
        );
        break;

      default:
        element = (
          <Input
            name={i.name}
            placeholder={i.placeholder}
            id={i.name}
            type={i.type}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [i.name]: event.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((i) => (
          <div key={i.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{i.label}</Label>
            {
              // rendering based on component type
              renderInputsByComponentType(i)
            }
          </div>
        ))}
      </div>
      <Button type="submit" className="mt-2 w-full">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default Form;
