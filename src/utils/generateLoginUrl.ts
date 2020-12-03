const generateLoginUrl = ({ server, username, password }: LoginFormData) =>
  `${server}/get.php?username=${username}&password=${password}&type=m3u_plus&output=ts`;

export default generateLoginUrl;
