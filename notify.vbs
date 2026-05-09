Set fso = CreateObject("Scripting.FileSystemObject")
Set file = fso.OpenTextFile("E:\ai-news-agent\news.txt", 1)

content = file.ReadAll
file.Close

MsgBox content, vbOKOnly + vbInformation, "AI News"