import React, { FC, ReactNode } from 'react';
import "./MyModal.scss";

interface MyModalProps {
	children: ReactNode;
	visible: boolean;
	setVisible: (visible: boolean) => void;
	customStyle?: string;
	width?: string;
}

const MyModal: FC<MyModalProps> = ({ children, visible, setVisible, customStyle, width = "670px" }) => {
	const rootClasses = ["myModal"];

	if (visible) {
		rootClasses.push("active");
	}

	return (
		<div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
			<div
				style={{ width }}
				className={`myModalContent ${customStyle ? customStyle : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}

export default MyModal;
