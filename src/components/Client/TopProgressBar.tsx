import { StyledLinearProgress } from "@/layouts/client/Theme";
import { setLoading } from "@/stores/client/loadingSlice";
import { RootState } from "@/stores/client/store";
import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const StyledProgressBar = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: theme.zIndex.appBar + 1,
}));

const LoadingOverlay = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    zIndex: theme.zIndex.modal + 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    pointerEvents: 'all', 
  }));
  


const TopProgressBar = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const [prevLocation, setPrevLocation] = useState("");
    const checkPathAdmin = location.pathname.includes("/admin");
    const isLoading = useSelector((state: RootState)=> state.loading)
    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);


    useEffect(() => {
        setPrevLocation(location.pathname);
        checkPathAdmin === true ? dispatch(setLoading(false))  : dispatch(setLoading(true));
        if (location.pathname === prevLocation) {
            setPrevLocation("");
        }
    }, [location])
    useEffect(() => {
        dispatch(setLoading(false));
    }, [prevLocation])


    return (
        <>
          {isLoading && (
                <>
                    <StyledProgressBar>
                        <StyledLinearProgress />
                    </StyledProgressBar>
                    <LoadingOverlay />
                </>
            )}
            {children}

        </>

    );
};

export default TopProgressBar;