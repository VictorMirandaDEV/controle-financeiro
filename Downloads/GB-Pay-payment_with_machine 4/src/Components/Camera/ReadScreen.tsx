import { BoletoBarcodeReader } from "../Scanner/boleto";

type Props = {
	tab: string;
	tabsId: string;
	isSmartDevice: boolean;
	readersHeight: number;
	readersWidth: number;
	onCancel: () => void;
	onDetectBoleto: () => void;
};

export const ReadScreen = ({
	tab,
	tabsId,
	isSmartDevice,
	readersHeight,
	readersWidth,
	onCancel,
	onDetectBoleto,
}: Props) => {
	return (
		<div
			id="readers rotate"
			// className="                     sm:portrait:rotate-90 sm:w-full                   "
		>
			{tab === "boleto" && (
				<div
					id={`${tabsId}_reader_boleto rotate`}
					//  className="rotate"
				>
					{isSmartDevice ? (
						// return
						<BoletoBarcodeReader
							// id="rotate"
							landscape={true}
							height={readersHeight}
							width={readersWidth}
							onCancel={onCancel}
							onDetected={onDetectBoleto}
						/>
					) : (
						<BoletoBarcodeReader
							height={readersHeight}
							onCancel={onCancel}
							onDetected={onDetectBoleto}
						/>
					)}
				</div>
			)}
		</div>
	);
};
