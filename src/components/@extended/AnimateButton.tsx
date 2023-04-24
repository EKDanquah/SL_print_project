
// third-party
import { motion } from 'framer-motion';

// ==============================|| ANIMATION BUTTON ||============================== //

export default function AnimateButton({ children, type }: AnimateButtonType) {
    switch (type) {
        case 'rotate': // only available in paid version
        case 'slide': // only available in paid version
        case 'scale': // only available in paid version
        default:
            return (
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                    {children}
                </motion.div>
            );
    }
}

type AnimateButtonType = {
    children: React.ReactElement | React.ReactElement[],
    type: 'slide' | 'scale' | 'rotate'
};

AnimateButton.defaultProps = {
    type: 'scale'
};
