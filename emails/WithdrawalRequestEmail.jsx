export function WithdrawalRequestEmail({
  interviewerName,
  interviewerEmail,
  credits,
  platformFee,
  netAmount,
  paymentMethod,
  paymentDetail,
  reviewUrl,
}) {
  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: "24px",
          backgroundColor: "#0b0b0c",
          color: "#e7e5e4",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            backgroundColor: "#111113",
            border: "1px solid #26272b",
            borderRadius: "16px",
            padding: "32px",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              color: "#34d399",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Withdrawal Request
          </p>
          <h1
            style={{
              margin: "0 0 24px",
              fontSize: "28px",
              lineHeight: 1.2,
              color: "#fafaf9",
            }}
          >
            {interviewerName} requested a payout
          </h1>

          <div
            style={{
              display: "grid",
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            <Row label="Interviewer" value={interviewerName} />
            <Row label="Email" value={interviewerEmail} />
            <Row label="Credits" value={String(credits)} />
            <Row label="Platform fee" value={`$${platformFee.toFixed(2)}`} />
            <Row label="Net amount" value={`$${netAmount.toFixed(2)}`} />
            <Row label="Payment method" value={paymentMethod} />
            <Row label="Payment detail" value={paymentDetail} />
          </div>

          <a
            href={reviewUrl}
            style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: "999px",
              backgroundColor: "#34d399",
              color: "#052e16",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Review payout request
          </a>
        </div>
      </body>
    </html>
  );
}

function Row({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "16px",
        paddingBottom: "12px",
        borderBottom: "1px solid #1f2023",
      }}
    >
      <span style={{ color: "#a8a29e", fontSize: "14px" }}>{label}</span>
      <span
        style={{
          color: "#fafaf9",
          fontSize: "14px",
          textAlign: "right",
          wordBreak: "break-word",
        }}
      >
        {value}
      </span>
    </div>
  );
}
