export const providerSignin = async ({
  name = "Default User",
  email,
  image = "",
  provider,
  githubIdentifier,
  bio,
}) => {
  try {
    if (
      (!email && provider === "google") ||
      (provider === "github" && !githubIdentifier)
    ) {
      return {
        success: false,
        message: "Invalid configuration",
      };
    }
    await connectDB();
    if (provider === "google") {
      const user = await userModel.findOne({ email, provider });
      if (!user) {
        const newUser = await userModel.create({
          email,
          name,
          pfp: image || "",
          provider,
          bio: bio || "no Bio provided.",
        });
        if (newUser) {
          return {
            success: true,
            user: JSON.stringify(newUser),
          };
        } else {
          return {
            success: false,
            message: "Something went wrong, Please try again later.",
          };
        }
      } else {
        return {
          success: true,
          user: JSON.stringify(user),
        };
      }
    } else {
      const user = await userModel.findOne({
        gitHubIdentifier: githubIdentifier,
      });
      if (!user) {
        const newUser = await userModel.create({
          email,
          name,
          pfp: image || "",
          provider,
          bio: bio || "no Bio provided.",
          gitHubIdentifier: githubIdentifier,
        });
        if (newUser) {
          return {
            success: true,
            user: JSON.stringify(newUser),
          };
        } else {
          return {
            success: false,
            message: "Something went wrong, Please try again later.",
          };
        }
      } else {
        return {
          success: true,
          user: JSON.stringify(user),
        };
      }
    }
  } catch (e) {
    console.log("error in Oauth : ", e);
    return {
      success: false,
      message: "Something went wrong, Please try again later.",
    };
  }
};
export const redirectToGitHub = async () => {
  redirect(
    "https://github.com/login/oauth/authorize?client_id=" +
      process.env.GitHub_Client_ID
  );
};
export async function Signup({ email, password, name }) {
  try {
    if (!email || !password || !name) {
      return {
        success: false,
        message: "Please fill all the fields",
      };
    }
    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }
    await connectDB();
    const user = await userModel.findOne({ email, provider: "credentials" });
    if (user) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const hashed = await bcrypt.hash(password, 10);
    if (!hashed) {
      return {
        success: false,
        message: "Somethig went wrong. Please try again later.",
      };
    }
    const newUser = await userModel.create({
      email,
      password: hashed,
      name,
      provider: "credentials",
    });
    if (newUser) {
      return {
        success: true,
      };
    }
    return {
      success: false,
      message: "Somethig went wrong. Please try again later.",
    };
  } catch (e) {
    return {
      success: false,
      message: e.message || "Somethig went wrong. Please try again later.",
    };
  }
}
export const getGithubInfo = async (code) => {
  try {
    const response = await fetch(
      `https://github.com/login/oauth/access_token?client_id=${process.env.GitHub_Client_ID}&client_secret=${process.env.GitHub_Client_Secret}&code=${code}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    if (data.access_token) {
      const userResponse = await fetch(`https://api.github.com/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.access_token}`, // Properly format the Authorization header
        },
      });

      const userData = await userResponse.json();
      const { avatar_url, name, email, bio, login } = userData;
      const result = await providerSignin({
        name,
        email,
        image: avatar_url,
        provider: "github",
        bio,
        githubIdentifier: login,
      });
      return result;
    } else {
      return {
        success: false,
        message: "Failed to retrieve access token. Please try again later.",
      };
    }
  } catch (error) {
    console.error("Error in getGithubInfo:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
};

export const signIn = async ({ email, password }) => {
  try {
    if (!email || !password) {
      return {
        success: false,
        message: "Please fill all the fields",
      };
    }
    await connectDB();
    const user = await userModel.findOne({ email, provider: "credentials" });
    if (!user) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          success: false,
          message: "Invalid credentials",
        };
      } else {
        return {
          success: true,
          user: JSON.stringify(user),
        };
      }
    }
  } catch (e) {
    return {
      success: false,
      message: "something went wrong, please try again later.",
    };
  }
};
