import { Grow } from "@mui/material"
import { useLocation } from "react-router-dom"

const TransactionDetailPage = () => {
    const location = useLocation()
    const { test } = location.state
    console.log(test)
    return (
        <Grow in timeout={800}>
            <div>
                TransactionDetailPage
            </div>
        </Grow>

    )
}

export default TransactionDetailPage