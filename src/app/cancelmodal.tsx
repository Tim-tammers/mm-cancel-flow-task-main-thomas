// components/CancelModal.tsx
import React from "react";
import Modal from "./modal"; // Reuse the modal we built earlier
import EmpState from '../assets/empire-state-compressed.jpg';
interface CancelModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CancelModal({ isOpen, onClose }: CancelModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center justify-center w-full">
                <p className="text-gray-800 p-6 border-b border-gray-300 w-full text-center">Subscription Cancellation</p>

                <div className="flex flex-row-reverse p-3 gap-4">
                    <img src={EmpState.src} alt="Empire-State" className="w-80 h-66 object-cover rounded-lg" />

                    <div className=" space-y-2.5" >
                        <h2 className="text-gray-800">Hey mate, Quick one before you go.</h2>
                        <h2 className="text-gray-800">Have you found a job yet?</h2>
                        <p className="text-gray-800 border-b border-gray-300">Whatever your answer, we just want to help you take the next staep. With visa support, or by hearing how we can do better.</p>
                        <button className="text-gray-800 w-full border border-gray-300 rounded-md py-2 px-4 hover:bg-green-50 transition">
                            Yes, I've found a job
                        </button>
                        <button className="text-gray-800 w-full border border-gray-300 rounded-md py-2 px-4 hover:bg-purple-50 transition mt-2">
                            Not yet - I'm still looking
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
