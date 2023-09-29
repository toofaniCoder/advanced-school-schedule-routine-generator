import ThemeRegistry from "./ThemeRegistry";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// app/layout.js
export default function RootLayout(props) {
  const { children } = props;
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
