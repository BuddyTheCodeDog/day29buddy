"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = 'https://wpvnbefbwiteogcwdbye.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indwdm5iZWZid2l0ZW9nY3dkYnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzgxNjg4MDAsImV4cCI6MTk5Mzc0NDgwMH0.J6fTdkRx3dDc6UHZ34mvhkV_5tovRaPYjJ4H_Qbg3uE';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/test", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const username = req.body.username;
        const email = req.body.email;
        const user = {
            uuid: (0, uuid_1.v4)(),
            username: username,
            email: email
        };
        const { error } = yield supabase
            .from('test')
            .insert(user);
        res.send("testing post");
    });
});
function getUserById(supabase, uuid) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(uuid);
        const { data, error } = yield supabase
            .from('test')
            .select()
            .eq('uuid', uuid);
        return data;
    });
}
function changeUsername(supabase, uuid, newUsername) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase
            .from('test')
            .update({ username: newUsername })
            .eq('uuid', uuid)
            .select();
        return data;
    });
}
;
app.put("/test/:uuid", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUsername = req.body.newUsername;
        const data = yield changeUsername(supabase, req.params.uuid, newUsername);
        res.send(data);
    });
});
app.get("/test/:uuid", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.params.uuid);
        const data = yield getUserById(supabase, req.params.uuid);
        res.send(data);
    });
});
app.get("/test", function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { data, error } = yield supabase
            .from('test')
            .select();
        res.send(data);
    });
});
app.listen("3002");
