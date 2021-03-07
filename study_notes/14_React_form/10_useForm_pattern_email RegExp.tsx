/*
  Javascript : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  - https://emailregex.com/ 참고.
*/
export const CreateAccount = () => {
  return (
    <form
      onSubmit={handleSubmit(onValidSubmit)}
      className="grid gap-3 mt-5 w-full"
    >
      <input
        ref={register({
          required: "Email is required",
          pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        })}
        type="email"
        placeholder="Email"
        name="email"
        required
        className="capsule-input"
      />
      {errors?.email?.message && (
        <FormError errorMessage={errors?.email?.message} />
      )}
      {errors?.email?.type === "pattern" && (
        <FormError errorMessage="Invalid Email Address" />
      )}
      {/* ~~~ */}
    </form>
  );
};

// ==============================================================
// [components/form-errors.tsx]
import React from "react";

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span className="font-semibold text-red-500">{errorMessage}</span>
);

// ==============================================================
