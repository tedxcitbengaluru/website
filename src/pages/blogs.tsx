import React from "react";

const Blogs: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f5f5f5", // light grey 
        fontFamily: "'Georgia', serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem", // 
          fontWeight: "bold",
          color: "#333", // dark grey 
          lineHeight: "1.4",
          marginBottom: "2rem",
        }}
      >
        "Either Write Something Worth Reading <br /> or Do Something Worth Writing."
      </h1>
      <h2
        style={{
          fontSize: "2rem",
          color: "#777", // lighter grey 
          fontStyle: "italic",
        }}
      >
        Coming Soon...
      </h2>
    </div>
  );
};

export default Blogs;
//
//