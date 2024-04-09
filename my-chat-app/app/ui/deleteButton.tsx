
import { deleteRoomChat } from "../lib/actions";
import { Button } from "@mui/material";

export function Delete({ id, getDataChatRoom }: { id: string, getDataChatRoom: any }) {

    const handleDelete = async () => {
        const result = confirm("Bạn có chắc chắn muốn xóa?");
        if (result) {
            await deleteRoomChat(id)
            await getDataChatRoom()
            console.log("Xóa thành công");
        } else {
            // Xử lý khi người dùng chọn Cancel
            console.log("Hủy bỏ xóa");
        }
    }
    return (
        <div className="flex justify-end">
            <Button onClick={handleDelete} variant="outlined" color="error">Xóa</Button>
        </div>

    );
}