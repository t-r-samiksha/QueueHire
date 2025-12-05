import "../styles/dashcard.css";

function DashCard({ title, qty, icon }) {
  return (
    <div className="dc-wrapper">
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <p className="dc-title">{title}</p>
        <img src={icon} alt="" height={30} />
      </div>
      <p className="dc-qty">{qty}</p>
    </div>
  );
}
export default DashCard;
