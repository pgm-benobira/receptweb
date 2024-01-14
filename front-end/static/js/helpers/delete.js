// ---------------- DELETE THE DATA -----------------------------------------------------------------------------------------------------------------------
export async function deleteData(url) {
    try {
        const response = await fetch(url, {
            method: "DELETE",
        });
    } catch (error) {
        console.error(error.message);
    };
};