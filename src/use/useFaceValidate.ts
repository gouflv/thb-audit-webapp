import { Toast } from "vant";
import { defaultErrorHandler, POST } from "../ajax";
import get from "lodash.get";

export const useFaceValidate = (id: string) => {
  async function createAndRedirectToValidate() {
    if (!id) {
      throw new Error("apply id must provided");
    }

    try {
      Toast.loading({ duration: 0, forbidClick: true });
      const res = await POST({
        url: "realpersonauth/init",
        data: {
          apply_no: id,
          //@ts-ignore
          mate_info: window.getMetaInfo(),
        },
      });
      const redirect = get(res, "ResultObject.CertifyUrl");
      if (!redirect) {
        Toast("无法打开人脸识别");
        return;
      }

      localStorage.setItem("face-validate-resume-page", redirect);

      window.location.assign(redirect);
    } catch (e) {
      defaultErrorHandler(e);
    } finally {
      Toast.clear();
    }
  }

  return { createAndRedirectToValidate };
};
