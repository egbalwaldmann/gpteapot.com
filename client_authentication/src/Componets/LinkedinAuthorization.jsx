import { Link } from "react-router-dom";
import GreenTeapot from "../assets/GreenTeapot.jpeg";

const LinkedinAuth = () => {
  return (
    <div>
      <h1>gpteapot.com</h1>

      <img
        src={GreenTeapot}
        alt={"Teapot"}
        style={{ width: "100px", height: "auto" }}
      />

      <p>Your sociable AI chatbot!</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          to={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${
            import.meta.env.VITE_VERCEL_ENV_LINKEDIN_CLIENT_ID
          }&redirect_uri=https://app.gpteapot.com/&state=foobar&scope=r_liteprofile%20r_emailaddress%20w_member_social`}
        >
          <div type="submit" style={{ height: "40px", width: "215px" }}>
            <img
              style={{ height: "100%", width: "100%" }}
              src={
                "https://taggbox.com/blog/wp-content/uploads/2018/09/Signin-with-LinkedIn.png"
              }
              alt={"LinkedIn authentification"}
            />
          </div>
        </Link>
      </div>
      <p>
        Imprint | Privacy |
        <span style={{marginLeft: "4px", display: "inline-block"}}>
          <Link to={`https://github.com/egbalwaldmann/gpteapot.com`}>
            GitHub
          </Link>
        </span>
      </p>
    </div>
  );
};

export default LinkedinAuth;
