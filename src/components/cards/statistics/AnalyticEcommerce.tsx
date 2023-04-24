
// material-ui
import { Box, Chip, Grid, Stack, Typography } from '@mui/material';

// project import

// assets
import { RiseOutlined, FallOutlined } from '@ant-design/icons';
import MainCard from '../../MainCard';

// ==============================|| STATISTICS - ECOMMERCE CARD  ||============================== //

const AnalyticEcommerce = ({ color = 'primary', title, count, percentage, isLoss, extra }: AnalyticEcommerceType) => (
    <MainCard
        contentSX={{ p: 2.25 }}
    >
        <Stack spacing={0.5}>
            <Typography
                variant="h6" color="textSecondary">
                {title}
            </Typography>
            <Grid container alignItems="center">
                <Grid item>
                    <Typography variant="h4" color="inherit">
                        {count}
                    </Typography>
                </Grid>
                {percentage && (
                    <Grid item>
                        <Chip
                            // variant="combined"
                            variant="filled"
                            color={color}
                            icon={
                                <>
                                    {!isLoss && <RiseOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                                    {isLoss && <FallOutlined style={{ fontSize: '0.75rem', color: 'inherit' }} />}
                                </>
                            }
                            label={`${percentage}%`}
                            sx={{ ml: 1.25, pl: 1 }}
                            size="small"
                        />
                    </Grid>
                )}
            </Grid>
        </Stack>
        <Box sx={{ pt: 2.25 }}>
            <Typography variant="caption" color="textSecondary">
                {
                    isLoss ? " " :
                        // "You made an extra"
                        " "
                }
                {' '}
                <Typography component="span" variant="caption" sx={{ color: `${color || 'primary'}.main` }}>
                    {extra}
                </Typography>{' '}
                {/* this year */}
            </Typography>
        </Box>
    </MainCard>
);

type AnalyticEcommerceType = {
    color?: "primary" | "secondary" | "default" | "error" | "info" | "success" | "warning",
    title: string,
    count: string,
    percentage: number,
    isLoss?: boolean,
    extra: React.ReactElement | string,
};



export default AnalyticEcommerce;
