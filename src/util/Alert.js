import swal from "sweetalert";

export const alert = (title, data, type) => {
  return swal(title, data, type);
};

export const warning = () => {
  return swal({
    title: "Are You Sure!",
    icon: "warning",
    dangerMode: true,
    buttons: true,
  });
};

//Delete Warning for category
export const warningForText = (text) => {
  return swal({
    title: "Are You Sure!",
    text: text,
    icon: "warning",
    dangerMode: true,
    buttons: true,
  });
};

//For Permission
export const permissionError = () => {
  return swal({
    title: "Opps! You don't have Permission.",
    icon: "error",
  });
};
