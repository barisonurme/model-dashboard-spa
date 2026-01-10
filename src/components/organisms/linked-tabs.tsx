import { alpha, Tab, Tabs, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

// ----------------------------------------------------------------------

type Props = {
    grey?: boolean;
    tabs: { label: string; link: string }[];
    initialTab?: string;
};

const LinkedTabs = ({ grey, tabs, initialTab }: Props) => {
    const location = useLocation();

    const navigate = useNavigate();

    const currentTab = location.pathname.split('/').pop();


    // Side effect for out of tab links
    useEffect(() => {
        if (!initialTab) return
        if (initialTab && !tabs.find(tab => tab.link === currentTab)) {
            // Redirect to initialTab if currentTab is not found in tabs
            navigate(initialTab, { replace: true });
        }
    }, [currentTab, initialTab, navigate, tabs]);

    const theme = useTheme()


    if (tabs.find(tab => tab.link === currentTab) === undefined) {
        return null; // Don't render tabs if currentTab is not valid
    }


    return (
        <Tabs
            value={currentTab}
            slotProps={{ indicator: { style: { display: "none" } } }}
            sx={{
                borderRadius: 0,
                minHeight: 40,
                '& .MuiTab-root': { backgroundColor: alpha(theme.palette.primary.dark, 0.1), minHeight: 40, textTransform: 'none', color: "primary.contrastText", marginRight: 2, borderTop: 2, borderLeft: 2, borderRight: 2, borderColor: alpha(theme.palette.primary.dark, 0.2), borderTopLeftRadius: 5, borderTopRightRadius: 5, },
                '& .Mui-selected': { backgroundColor: grey ? "#E8EEF0" : 'background.default', color: 'primary.main', borderTop: 2, borderLeft: 2, borderRight: 2, borderColor: 'divider', borderTopLeftRadius: 5, borderTopRightRadius: 5, },
            }}
        >
            {tabs.map(tab => (
                <Tab
                    disableRipple
                    key={tab.link}
                    label={tab.label}
                    value={tab.link}
                    component={Link}
                    to={tab.link}
                    relative="route"
                />
            ))}
        </Tabs>
    );
};

export default LinkedTabs;
