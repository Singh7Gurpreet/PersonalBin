var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import linkGenerator from "../../utils/awsUploadLinkGenerator.js";
const postFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.user;
        const { fileName } = req.body;
        console.log(req.body);
        const link = yield linkGenerator(email, fileName);
        return res.json({ link });
    }
    catch (error) {
        console.error("Error generating file upload link:", error);
        return res.status(500).json({ error: "Failed to generate link" });
    }
});
export default postFile;
