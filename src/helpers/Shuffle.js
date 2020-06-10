export default (arr) => {
    let temp_arr = [...arr];
    temp_arr.sort(() => Math.random() - 0.5);
    return ['start', ...temp_arr];
}