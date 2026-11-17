import { useEffect } from 'react';
import styles from './Modal.module.css';
import { XMark } from '../../../assets/icons/Common/Common';

export const Modal = ({ isOpen, onClose, title, children, footer }) => {

    // Prevent the background from scrolling when the modal is open.
    useEffect(() => {
        if (isOpen) {
            // We save the original values.
            const originalBodyOverflow = document.body.style.overflow;
            const originalHtmlOverflow = document.documentElement.style.overflow;

            // We block scrolling on both.
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            return () => {
                // We restore upon closing
                document.body.style.overflow = originalBodyOverflow;
                document.documentElement.style.overflow = originalHtmlOverflow;
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            {/* We prevent a click inside the modal from closing it.*/}
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <header className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
                        <XMark />
                    </button>
                </header>

                <div className={styles.content}>
                    {children}
                </div>

                {footer && (
                    <footer className={styles.footer}>
                        {footer}
                    </footer>
                )}

            </div>
        </div>
    );
};