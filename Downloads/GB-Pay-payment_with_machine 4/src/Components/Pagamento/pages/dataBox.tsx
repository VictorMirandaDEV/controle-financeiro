export const DataBox = ({ label, value }: { label: string; value: any }) => {
	return (
		<section className="flex justify-between flex-row ">
			<div style={{ fontSize: "14px", color: "gray" }}>{label}:</div>
			<div className="pl-4" style={{ fontSize: "14px", fontWeight: "bold" }}>{value}</div>
		</section>
	);
};
