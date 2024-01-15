export const MESSAGE = {
    required: "Vui lòng nhập !",
    email: "Vui lòng nhập đúng định dạng email !",
    password: "Tối thiểu sáu ký tự, ít nhất một chữ cái và một số",
};

export const REGEX = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
};
