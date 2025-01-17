import { PropsWithChildren } from 'react';

type ModalProps = {
  title: string;
  onClose: () => void;
  ariaHidden: boolean;
};

const Modal = ({title, children, onClose, ariaHidden}: PropsWithChildren<ModalProps>) => {
  return <div className="modal h-max p-12 pr-6 pt-4 bg-zinc-50 mx-auto w-3/4 rounded-lg drop-shadow-xl border-gray-700 drop-shadow-x absolute left-1/2 -translate-x-1/2 top-10 z-100" aria-hidden={ariaHidden}>
          <div className='w-full flex flex-row justify-end'>
            <button
              onClick={() => {
                onClose();
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 40">
                <path
                  d="M 10,10 L 30,30 M 30,10 L 10,30"
                  stroke="black"
                  strokeWidth="4"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-xl font-bold mb-8 text-center w-full">{title}</h2>
           <div className="max-h-modal overflow-auto">
            {children}
           </div>
        </div>
  
}

export default Modal;