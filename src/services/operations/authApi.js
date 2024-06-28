import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { categories, endpoints } from "../apis";
import { setToken, setSignupData } from "../../utils/authSlice";
import { setUser } from "../../utils/profileSlice";

const {
  LOGIN_API,
  SENDOTP_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  SIGNUP_API,
} = endpoints;

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
      });

      console.log("SEND OTP API Response.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP SENT Successfull");
      navigate("/verify-email");
    } catch (error) {
      console.log("OTP SENT ERROR............", error);
      toast.error("OTP SENT Failed");
    }

    toast.dismiss(toastId);
  };
}

export function getPasswordToken(email, setEmailSent) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      console.log("API Response.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("URL SENT Successfull");
      setEmailSent(true);
    } catch (error) {
      console.log("URL SENT ERROR............", error);
      toast.error("URL SENT Failed");
    }

    toast.dismiss(toastId);
  };
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      console.log("API Response.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password Update Successfull");
      navigate("/login");
    } catch (error) {
      console.log("Password Update ERROR............", error);
      toast.error("Password Update Failed");
    }

    toast.dismiss(toastId);
  };
}

export function signup(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  contactNumber,
  accountType,
  otp,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        accountType,
        otp,
      });

      console.log("Signup API Response.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup Successfull");
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      dispatch(setSignupData(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("Signnp API ERROR............", error);
      toast.error("Signup Failed");
    }

    toast.dismiss(toastId);
  };
}

export function logOut(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    dispatch(setSignupData(null));
    dispatch(setToken(null));
    dispatch(setUser(null));

    navigate("/");

    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("Login API Response.....", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successfull");
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      console.log(response);
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error(error.response.data.message);
    }

    toast.dismiss(toastId);
  };
}
