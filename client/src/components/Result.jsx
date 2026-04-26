function Result({ result, loading }) {
  const copyText = () => {
    navigator.clipboard.writeText(result);
    alert("Copied!");
  };

  // 🔄 SHOW LOADING UI
  if (loading) {
    return (
      <div className="result loading">
        <div className="loader"></div>
        <p className="loading-text">Generating your email...</p>
      </div>
    );
  }

  if (!result) return null;

  const lines = result.split("\n");

  return (
    <div className="result fade-in">
      <h2>Generated Email</h2>

      <div className="email-box">
        {lines.map((line, index) => {
          if (line.toLowerCase().includes("subject")) {
            return (
              <div key={index} className="email-subject">
                {line}
              </div>
            );
          }

          if (line.toLowerCase().includes("regards")) {
            return (
              <div key={index} className="email-sign">
                {line}
              </div>
            );
          }

          return <p key={index}>{line}</p>;
        })}
      </div>

      <div className="copy-btn">
        <button onClick={copyText}>Copy</button>
      </div>
    </div>
  );
}

export default Result;