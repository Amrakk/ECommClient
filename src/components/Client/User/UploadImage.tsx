import { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    CircularProgress,
    Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useUserActions from "@/hooks/Admin/Users/useUserActions";
import { RootState } from "@/stores/client/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "@/stores/client/userSlice";

const AvatarUploadDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const { updateAvatarAction } = useUserActions();
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setLoading(true);
        updateAvatarAction
            .mutateAsync({
                _id: user!._id,
                avatar: selectedFile,
            })
            .then((res) => {
                setLoading(false);
                onClose();
                const newUpdatedUser = { ...user, avatarUrl: res.url };
                dispatch(setUser(newUpdatedUser));
                toast.success("Avatar updated successfully");
            })
            .catch((err) => {
                setLoading(false);
                console.error(err);
                toast.error("Failed to update avatar");
            });
    };

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 4 } }} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ textAlign: "center" }}>Upload Avatar</DialogTitle>
            <DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        p: 1,
                    }}
                >
                    <input
                        accept="image/*"
                        type="file"
                        onChange={handleFileSelect}
                        style={{ display: "none" }}
                        id="avatar-upload"
                    />
                    <label htmlFor="avatar-upload" style={{ width: "100%" }}>
                        <Box
                            sx={{
                                border: "2px dashed #ccc",
                                borderRadius: "50%", // Changed to circle for avatar
                                p: 3,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                backgroundColor: "rgba(0,0,0,0.02)",
                                "&:hover": {
                                    borderColor: "primary.main",
                                    backgroundColor: "rgba(0,0,0,0.05)",
                                },
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: 250,
                                height: 250,
                                margin: "0 auto",
                                justifyContent: "center",
                            }}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "50%",
                                    }}
                                />
                            ) : (
                                <>
                                    <AccountCircleIcon sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                                    <Typography variant="body1" color="text.secondary" align="center">
                                        Choose profile photo
                                    </Typography>
                                </>
                            )}
                        </Box>
                    </label>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button onClick={onClose} variant="outlined">
                    Cancel
                </Button>
                <Button
                    onClick={handleUpload}
                    disabled={!selectedFile || loading}
                    variant="contained"
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                >
                    {loading ? "Uploading..." : "Upload"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AvatarUploadDialog;
