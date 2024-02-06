export const MESSAGE = {
    required: "Please enter !",
    email: "Vui lòng nhập đúng định dạng email !",
    password: "Tối thiểu sáu ký tự, ít nhất một chữ cái và một số",
    phone: "Vui lòng nhập đúng định dạng phone",
};

export const REGEX = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
    phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
};
