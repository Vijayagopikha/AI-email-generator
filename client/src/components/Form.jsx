import { useState } from "react";

function Form({ onSubmit }) {
  const [form, setForm] = useState({
    emailType: "",
    purpose: "",
    role: "",
    degree: "",
    experienceYears: "",
    experienceIn: "",
    tone: "Formal",
    length: "Medium",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // remove error when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!form.emailType.trim()) {
      newErrors.emailType = "Email type is required";
    }

    if (!form.purpose.trim()) {
      newErrors.purpose = "Purpose is required";
    }

    // Optional: validate experience only if filled
    if (form.experienceYears && form.experienceYears < 0) {
      newErrors.experienceYears = "Experience cannot be negative";
    }

    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let cleanedForm = { ...form };

    const type = form.emailType.toLowerCase();

    // Remove unnecessary fields if NOT professional/job-related
    if (!type.includes("professional") && !type.includes("job")) {
      cleanedForm.role = "";
      cleanedForm.degree = "";
      cleanedForm.experienceYears = "";
      cleanedForm.experienceIn = "";
    }

    onSubmit(cleanedForm);
  };

  return (
    <div className="form">

      {/* Email Type */}
      <input
        name="emailType"
        placeholder="Enter Email Type"
        value={form.emailType}
        onChange={handleChange}
      />
      {errors.emailType && <p className="error">{errors.emailType}</p>}

      {/* Purpose */}
      <input
        name="purpose"
        placeholder="Enter purpose"
        value={form.purpose}
        onChange={handleChange}
      />
      {/* {errors.purpose && <p className="error">{errors.purpose}</p>} */}

      {/* Optional Fields */}
      <input name="role" placeholder="Role (optional)" onChange={handleChange} />
      <input name="degree" placeholder="Degree (optional)" onChange={handleChange} />

      <input
        name="experienceYears"
        type="number"
        placeholder="Experience Years (optional)"
        onChange={handleChange}
      />
      {errors.experienceYears && (
        <p className="error">{errors.experienceYears}</p>
      )}

      <input
        name="experienceIn"
        placeholder="Experience Field (optional)"
        onChange={handleChange}
      />

      {/* Tone */}
      <select name="tone" onChange={handleChange}>
        <option>Formal</option>
        <option>Informal</option>
      </select>

      {/* Length */}
      <select name="length" onChange={handleChange}>
        <option>Short</option>
        <option>Medium</option>
        <option>Long</option>
      </select>

      <button onClick={handleSubmit}>Generate</button>
    </div>
  );
}

export default Form;