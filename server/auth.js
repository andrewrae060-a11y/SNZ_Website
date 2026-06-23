import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function getRequiredEnvironmentValue(
  name
) {
  const value =
    process.env[name];

  if (!value) {
    throw new Error(
      `${name} is not configured.`
    );
  }

  return value;
}

export async function loginAdministrator(
  req,
  res,
  next
) {
  try {
    const configuredEmail =
      getRequiredEnvironmentValue(
        "ADMIN_EMAIL"
      );

    const configuredPasswordHash =
      getRequiredEnvironmentValue(
        "ADMIN_PASSWORD_HASH"
      );

    const jwtSecret =
      getRequiredEnvironmentValue(
        "ADMIN_JWT_SECRET"
      );

    const email =
      String(
        req.body?.email || ""
      )
        .trim()
        .toLowerCase();

    const password =
      String(
        req.body?.password || ""
      );

    if (!email || !password) {
      return res
        .status(400)
        .json({
          message:
            "Email and password are required.",
        });
    }

    if (
      email !==
      configuredEmail
        .trim()
        .toLowerCase()
    ) {
      return res
        .status(401)
        .json({
          message:
            "The email or password is incorrect.",
        });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        configuredPasswordHash
      );

    if (!passwordMatches) {
      return res
        .status(401)
        .json({
          message:
            "The email or password is incorrect.",
        });
    }

    const token = jwt.sign(
      {
        sub: configuredEmail,
        email: configuredEmail,
        role: "careers-admin",
      },
      jwtSecret,
      {
        expiresIn: "8h",
        issuer: "snz-careers",
        audience:
          "snz-administration",
      }
    );

    return res.json({
      token,

      administrator: {
        email:
          configuredEmail,
        role:
          "careers-admin",
      },
    });
  } catch (error) {
    next(error);
  }
}

export function requireAdministrator(
  req,
  res,
  next
) {
  try {
    const jwtSecret =
      getRequiredEnvironmentValue(
        "ADMIN_JWT_SECRET"
      );

    const authorizationHeader =
      String(
        req.headers
          .authorization || ""
      );

    if (
      !authorizationHeader.startsWith(
        "Bearer "
      )
    ) {
      return res
        .status(401)
        .json({
          message:
            "Administrator authentication is required.",
        });
    }

    const token =
      authorizationHeader
        .slice(7)
        .trim();

    if (!token) {
      return res
        .status(401)
        .json({
          message:
            "Administrator authentication is required.",
        });
    }

    const decoded =
      jwt.verify(
        token,
        jwtSecret,
        {
          issuer:
            "snz-careers",
          audience:
            "snz-administration",
        }
      );

    if (
      decoded.role !==
      "careers-admin"
    ) {
      return res
        .status(403)
        .json({
          message:
            "You do not have permission to access this resource.",
        });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    if (
      error?.name ===
        "JsonWebTokenError" ||
      error?.name ===
        "TokenExpiredError"
    ) {
      return res
        .status(401)
        .json({
          message:
            "Your administrator session is invalid or has expired.",
        });
    }

    next(error);
  }
}