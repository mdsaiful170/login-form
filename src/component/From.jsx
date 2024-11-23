import { useState } from "react";

const From = () => {
  const [showpass, setshowpass] = useState(false);
  const [showpass2, setshowpass2] = useState(false);
  const [error, setError] = useState({});
  const [data, setData] = useState([]);
  const [success, setSuccess] = useState({});
  const [counter, setcounter] = useState(1);
  const [fromdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const changeHanlde = (e) => {
    const { name, value } = e.target;
    setformdata((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const eyeHandler = () => setshowpass((pre) => !pre);
  const eyeHandler2 = () => setshowpass2((pre) => !pre);

  const isRequired = (value) => value.trim() !== "";
  const isWordrequired = (length, min, max) => length >= min && length <= max;

  const isEmailvalid = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
  };
  const isPasswordvalid = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return re.test(password);
  };

  const usernameCheck = () => {
    let valid = false;
    if (!isRequired(fromdata.username)) {
      setError((pre) => {
        return {
          ...pre,
          username: "username can't be empty",
        };
      });
    } else if (!isWordrequired(fromdata.username.length, 3, 25)) {
      setError((pre) => {
        return {
          ...pre,
          username: "username must be between 3 and 25 characters",
        };
      });
    } else {
      setError((pre) => ({ ...pre, username: "" }));
      valid = true;
    }
    return valid;
  };

  const useremailCheck = () => {
    let valid = false;
    if (!isRequired(fromdata.email)) {
      setError((pre) => {
        return {
          ...pre,
          useremail: "Email cannot be empty",
        };
      });
    } else if (!isEmailvalid(fromdata.email)) {
      setError((pre) => {
        return {
          ...pre,
          useremail: "please enter a valid email",
        };
      });
    } else {
      setError((pre) => {
        return {
          ...pre,
          useremail: "",
        };
      });

      valid = true;
    }
    return valid;
  };

  const userpasswordCheck = () => {
    let valid = false;
    if (!isRequired(fromdata.password)) {
      setError((pre) => ({ ...pre, userpassword: "password cannot be empty" }));
    } else if (!isPasswordvalid(fromdata.password)) {
      setError((pre) => {
        return {
          ...pre,
          userpassword:
            "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        };
      });
    } else {
      setError((pre) => ({ ...pre, userpassword: "" }));
      valid = true;
    }
    return valid;
  };

  const userconfirmpasswordCheck = () => {
    let valid = false;
    if (!isRequired(fromdata.confirmPassword)) {
      setError((pre) => ({
        ...pre,
        confrimpassword: "Please enter the password again.",
      }));
    } else if (fromdata.password !== fromdata.confirmPassword) {
      setError((pre) => {
        return {
          ...pre,
          confrimpassword: "Passwords do not match",
        };
      });
    } else {
      setError((pre) => ({ ...pre, confrimpassword: "" }));
      valid = true;
    }
    return valid;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const valid =
      usernameCheck() &&
      useremailCheck() &&
      userpasswordCheck() &&
      userconfirmpasswordCheck();
    if (!valid) {
      setSuccess((pre) => ({ ...pre, successMsg: "please fill the field" }));
      setTimeout(() => {
        setSuccess((pre) => ({ ...pre, successMsg: "" }));
      }, 1500);
    } else {
      let date = new Date().toLocaleDateString();
      setcounter((pre) => pre + 1);

      setData((pre) => [...pre, { ...fromdata, id: counter, dt: date }]);
      setformdata({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setError({});
      setSuccess((pre) => ({
        ...pre,
        successMsg: "Form submitted successfully",
      }));
      setTimeout(() => {
        setSuccess((pre) => ({
          ...pre,
          successMsg: "",
        }));
      }, 2000);
    }
  };

  return (
    <>
      <section className=" h-screen w-screen flex mt-10 items-center justify-center flex-col gap-8">
        <div className="container px-3 md:px-0 mx-auto">
          {success.successMsg && (
            <h1
              className={
                !success
                  ? "text-red"
                  : "text-xl rounded-lg backdrop-blur-xl shadow-md border border-white/10 font-bold bg-white/5 max-w-xs mx-auto text-stone-200 capitalize font-mono text-center p-2 mb-5"
              }
            >
              {success.successMsg}
            </h1>
          )}
          <form
            action=""
            className="max-w-md backdrop-blur-xl border  border-white/10  bg-white/5 rounded-md p-5 w-full mx-auto  shadow-md "
            onSubmit={submitHandler}
          >
            <h3 className="font-extrabold text-xl font-mono text-center pb-5">
              Login Form validation
            </h3>
            <div>
              <label htmlFor="username" className="text-gray-900 font-semibold">
                Username:
              </label>
              <input
                type="text"
                id="username"
                value={fromdata.username}
                name="username"
                onChange={changeHanlde}
                className="w-full bg-transparent shadow-sm border-amber-100/25 border  py-1 appearance-none outline-none rounded-md  px-2 text-base font-normal  mt-2"
              />
              {error.username && (
                <span className="pt-2 text-red-950">{error.username}</span>
              )}
            </div>
            <div className="pt-4">
              <label
                htmlFor="useremail"
                className="text-gray-900 font-semibold"
              >
                Useremail:
              </label>
              <input
                type="email"
                value={fromdata.email}
                id="useremail"
                onChange={changeHanlde}
                name="email"
                className="w-full bg-transparent shadow-sm border-amber-100/25 border  py-1 appearance-none outline-none rounded-md  px-2 text-base font-normal  mt-2"
              />
              {error.useremail && (
                <span className="pt-2 text-red-950">{error.useremail}</span>
              )}
            </div>
            <div className="pt-4">
              <label
                htmlFor="userpassword"
                className="text-gray-900 font-semibold"
              >
                password:
              </label>
              <div className="flex items-center justify-center ps-2 relative  border rounded-lg border-amber-100/25">
                <i
                  onClick={eyeHandler2}
                  className={`${
                    showpass2 ? "ri-eye-fill" : "ri-eye-off-fill"
                  } cursor-pointer`}
                ></i>
                <input
                  type={showpass2 ? "text" : "password"}
                  id="userpassword"
                  value={fromdata.password}
                  onChange={changeHanlde}
                  className="w-full bg-transparent shadow-sm  py-1  appearance-none outline-none  px-2 text-base font-normal  "
                  name="password"
                />
              </div>
              {error.userpassword && (
                <span className="pt-2 text-red-950">{error.userpassword}</span>
              )}
            </div>
            <div className="pt-4">
              <label
                htmlFor="conframpassword"
                className="text-gray-900 font-semibold"
              >
                Conframpassword:
              </label>
              <div className="flex items-center justify-center ps-2 relative  border rounded-lg border-amber-100/25">
                <i
                  onClick={eyeHandler}
                  className={`${
                    showpass ? "ri-eye-fill" : "ri-eye-off-fill"
                  } cursor-pointer`}
                ></i>
                <input
                  type={showpass ? "text" : "password"}
                  id="confrimpassword"
                  value={fromdata.confirmPassword}
                  onChange={changeHanlde}
                  className="w-full bg-transparent shadow-sm  py-1  appearance-none outline-none  px-2 text-base font-normal  "
                  name="confirmPassword"
                />
              </div>
              {error.confrimpassword && (
                <span className="pt-2 text-red-950">
                  {error.confrimpassword}
                </span>
              )}
            </div>

            <input
              type="submit"
              className="bg-green-600 px-4 text-white rounded-xl  py-2  text-md  font-semibold block mt-6  "
              value="Submit Now"
            />
          </form>
        </div>

        <div className="relative !overflow-x-auto container max-w-lg  shadow-md sm:rounded-lg md:max-w-3xl ">
          <table className="w-full text-sm text-left rtl:text-right border overflow-x-auto border-white/5 shadow-md text-gray-900">
            <thead className="text-xs border border-white/10 text-gray-700 uppercase bg-white/5 backdrop-blur-xl ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  id
                </th>
                <th scope="col" className="px-6 py-3">
                  date
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Passwod
                </th>
              </tr>
            </thead>
            <tbody className="">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className=" odd:bg-white/5 border border-white/10 odd:dark:bg-graxy-900 even:bg-gray-800/5"
                >
                  <th className="px-6 py-4">{item.id}</th>
                  <td className="px-6 py-4">{item.dt}</td>
                  <td className="px-6 py-4">{item.username}</td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-blue-800 hover:underline"
                    >
                      {item.email}
                    </a>
                  </td>
                  <td className="px-6 py-4">{item.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <br/><br/>
    </>
  );
};
export default From;
