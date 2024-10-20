import * as fs from "fs";

type Repo = {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
  isFork: number;
};

type Lang = {
  id: number;
  label: string;
};

type LangBy = {
  repoId: string;
  langId: number;
};

type LangRaw = {
  node: {
    name: string;
  };
};

(async () => {
  const raw = await JSON.parse(
    fs.readFileSync("./data/raw.json", { encoding: "utf-8" })
  );
  const repo: Repo[] = raw.map(
    (rep: {
      id: string;
      isPrivate: boolean;
      name: string;
      url: string;
      isFork: boolean;
    }) => ({
      id: rep.id,
      name: rep.name,
      url: rep.url,
      isPrivate: rep.isPrivate ? 1 : 2,
      isFork: rep.isFork ? 1 : 2,
    })
  );

  const langs: Lang[] = [];
  const lang_by_repo: LangBy[] = [];
  let langId: number = 1;
  raw.forEach((rep: any) => {
    rep.languages.forEach((lang: LangRaw) => {
      if (!langs.some((lg: Lang) => lg.label === lang.node.name)) {
        langs.push({ id: langId, label: lang.node.name });
        langId++;
      }
      const myLang = langs.find(
        (lg: Lang) => lg.label === lang.node.name
      ) as Lang;
      lang_by_repo.push({ repoId: rep.id, langId: myLang.id });
    });
  });

  await fs.writeFile("./data/repo.json", JSON.stringify(repo), (err) =>
    err ? console.error(err) : console.log("File repo created")
  );

  await fs.writeFile("./data/langs.json", JSON.stringify(langs), (err) =>
    err ? console.error(err) : console.log("File langs created")
  );

  await fs.writeFile(
    "./data/lang_by_repo.json",
    JSON.stringify(lang_by_repo),
    (err) =>
      err ? console.error(err) : console.log("File lang_by_repo created")
  );

  await fs.writeFile(
    "./data/status.json",
    JSON.stringify([
      {
        id: 1,
        label: "Privé",
      },
      {
        id: 2,
        label: "Public",
      },
    ]),
    (err) => (err ? console.error(err) : console.log("File lang created"))
  );

  await fs.writeFile(
    "./data/fork.json",
    JSON.stringify([
      {
        id: 1,
        label: "Fork",
      },
      {
        id: 2,
        label: "Non Fork",
      },
    ]),
    (err) => (err ? console.error(err) : console.log("File fork created"))
  );
})();
