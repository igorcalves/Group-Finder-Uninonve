import React, { Dispatch, SetStateAction, useEffect } from 'react';
import './styles.css';
import { CircularProgress } from '@mui/material';
import PrimaryButton from '../../button/primaryButton';
import { useGlobalContext } from '../../../context';
interface RedirectModalProps {
    isVisible: boolean;
    handleCloseModal: Dispatch<SetStateAction<boolean>>;
}
const RedirectModal: React.FC<RedirectModalProps> = ({
    isVisible,
    handleCloseModal,
}) => {
    const [timeToRedirect, setTimeToRedirect] = React.useState(5);
    const { setCurrentPage } = useGlobalContext();
    useEffect(() => {
        let time = timeToRedirect;

        if (isVisible) {
            const interval = setInterval(() => {
                time -= 1;
                setTimeToRedirect(time);

                if (time === 0) {
                    clearInterval(interval);
                    handleCloseModal(false);
                    setCurrentPage('login');
                }
            }, 1000);

            return () => clearInterval(interval);
        } else {
            setTimeToRedirect(5);
        }
    }, [isVisible, timeToRedirect]);
    return (
        <div className="background-modal">
            <div className="redirect-modal-container">
                <h1>Para criar um grupo você precisa ter uma conta</h1>
                <div className="loading-container">
                    <CircularProgress color="primary" size={90} />
                    <p>
                        Você será redirecinado em{' '}
                        <strong>{timeToRedirect}</strong> segundos
                    </p>
                    <PrimaryButton
                        onClick={() => handleCloseModal(false)}
                        widthP="200px"
                        colorP="#01b3ff"
                        colorText="#fff"
                    >
                        Cancelar
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default RedirectModal;
