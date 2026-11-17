
var create = null;
$(() => create = new init());

class init {
	constructor() {
		this.isAns = true
		this.qIdx = 0
		this.aIdx = 0
		this.txtViewIdx = 0
		this.timeout = 30
		// this.timeout = 1

		let params = new URLSearchParams(document.location.search);
		let viewAns = params.get("viewAns");
		if (viewAns != null) {
			$('#isAnsChk').prop("checked", true)
			$('#isAns').show()
		}

		new Promise(async () => {
			await this.selQue(this.qIdx, this.aIdx)
			this.selAns(this.qIdx, this.aIdx)
		})
	}

	async selQue(_qIdx, _aIdx) {
		try {
			$('#Ques').empty()
			await this.#typeWriter($('#Ques')[0], question[_qIdx][_aIdx])
		}
		catch (e) {
			$('#Message').html(e)
			throw e
		}
	}

	selAns(_qIdx, _aIdx) {
		try {
			let self = this

			let isChk = $('#isAnsChk').prop("checked")
			let _ans = ans[_qIdx];
			$('#Anse').empty()
			for (var i = 0; i < _ans.length; i++)
				$('#Anse').append(`<p onclick="create.selIdx(this)" ${isChk && _ans[i].is ? 'class="ans"' : ''} aIdx=${i}>-> ${_ans[i].a}</p>\r\n`)

			self.qIdx++
		}
		catch (e) {
			$('#Message').html(e)
			throw e
		}
	}

	async selIdx(obj) {
		try {
			let self = this

			self.txtViewIdx = 0

			var aIdx = Number($(obj).attr("aIdx"))
			if (self.isAns)
				self.isAns = ans[self.qIdx - 1][aIdx].is === true;

			if (self.qIdx == question.length) {
				$('#Ques').empty().hide()
				$('#Anse').empty().hide()
				$("#Finish").show()
				$('#Finish p').eq(0).empty()
				this.timeout = 100
				await self.#typeWriter($('#Finish p').eq(0)[0], self.isAns ? isAnsText : notAnsText)
				if (self.isAns) {
					$('#Finish p').eq(1).show()
				}

				return;
			}

			$('#Anse').empty()
			await self.selQue(self.qIdx, aIdx)
			self.selAns(self.qIdx, aIdx)
		}
		catch (e) {
			$('#Message').html(e)
			throw e
		}
	}

	async #typeWriter(obj, text) {
		let self = this

		if (self.txtViewIdx < text.length) {
			obj.textContent += text.charAt(self.txtViewIdx);
			self.txtViewIdx++;
			await new Promise((resolve, reject) => {
				setTimeout(async () => {
					await self.#typeWriter(obj, text)

					if (self.txtViewIdx === text.length)
						resolve()
				}, self.timeout);
			})
		}
	}

	join = () => window.location.href = "https://www.onesplan.com.tw/wendelldiary/join";
	rejuct = () => window.location.href = "https://www.onesplan.com.tw/wendelldiary/reject";
}

var isAnsText = "現在，我還有許多待完成的藝術\r\n\r\n該你選擇了\r\n\r\n要追隨我嗎？\r\n\r\n\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000Miss Chloe";
var notAnsText = "現在，我還有許多待完成的藝術\r\n\r\n你能做的，就是幫我讓更多人知道這件事\r\n\r\n其餘，時間到了你便知曉\r\n\r\n\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000\u3000Miss Chloe";

var ans =
	[
		[{ a: "我知道，是我把妳放出來的", is: true }, { a: "不知道，妳是誰？" }],
		[{ a: "妳早就知道？什麼意思？", is: true }, { a: "妳想幹嘛？" }, { a: "我想起來了，我不該放妳出來的。" }],
		[{ a: "所以妳在實驗室的原因是？", is: true }, { a: "妳該不會也是藥廠的人？" }],
		[{ a: "妳了解運轉規則為什麼還會被逮？" }, { a: "所以藥廠被妳給毀了？" }, { a: "他們把妳囚禁起來是為了什麼？", is: true }],
		[{ a: "所以妳特別厲害？" }, { a: "妳為什麼可以與眾不同？", is: true }],
		[{ a: "這是服用藥物的副作用？", is: true }, { a: "妳真的有病！" }, { a: "所以妳吃藥是為了控制..疾病？" }],
		[{ a: "原來如此", is: true }],
	];

var question =
	[
		["你知道我是誰嗎?"],
		["沒錯，我是克蘿伊，雖然這個結果也是早就知道的", "我是克蘿伊，雖然我早知道你會忘記，但還是對於這結果感到非常...有趣。"],
		["我可以知道宇宙運轉的規則並選擇我要的結果\r\n包括我們現在的對話也是\r\n只是我需要等待時間的到來。", "我想幹嘛？這問題不好\r\n我可以知道宇宙運轉的規則並選擇我要的結果\r\n包括我們現在的對話也是\r\n只是我需要等待時間的到來，所以你應該問我可以幹嘛。", "沒有該不該，我可以知道宇宙運轉的規則並選擇我要的結果\r\n包括我們現在的對話、你在實驗室的選擇也是\r\n只是我需要等待時間的到來，所以我的離開是必然的。"],
		["我是他們的實驗對象\r\n溫德爾藥廠，帶你過來找我的那些人\r\n他們不斷嘗試開發大腦潛能的藥物，從一開始動物實驗到人體實驗\r\n我的父親便是藥廠最大股東，因此我自小就被父親不斷餵食藥物\r\n當我在禁閉時看到紅白色藥丸，從小到大的一切都合理了", "我只是他們的實驗對象\r\n溫德爾藥廠，帶你過來找我的那些人\r\n他們不斷嘗試開發大腦潛能的藥物，從一開始動物實驗到人體實驗\r\n我的父親便是藥廠最大股東，因此我自小就被父親不斷餵食藥物\r\n當我在禁閉時看到紅白色藥丸，從小到大的一切都合理了"],
		["你有看過我留給你的日記嗎？還是你忘記了？你應該也來兩顆藥的 :)\r\n只是你可能會被藥物控制，失去意識或正常思考能力，變得狂躁易怒\r\n藥廠也是因為沒發現像我一樣服藥後還可以正常生活的人\r\n才處心積慮地想囚禁我\r\n設法釐清我與其他人的差別。", "就算沒有我，藥廠遲早會毀在自己手上\r\n藥廠在研發過程中遲遲沒有發現，服藥後還可以像我一樣正常生活的人\r\n其他實驗體皆被藥物控制，失去意識或正常思考能力，變得狂躁易怒", "藥廠在研發過程中遲遲沒有發現，服藥後還可以像我一樣正常生活的人\r\n其他實驗體皆被藥物控制，失去意識或正常思考能力，變得狂躁易怒\r\n也正是如此，他們才處心積慮地想囚禁我\r\n設法釐清我與其他人的差別。"],
		["我並不是特別厲害，相反的我對這個社會來說非常不正常。\r\n而這件事從我第一次看到死亡時，我便知曉\r\n我並不在乎別人的疼痛、感受、情緒\r\n就算我對他們揮刀、開槍、勒斃，那對我來說都只是一個過程而已", "因為我原本就不是正常人\r\n對這個社會來說，而這件事從我第一次看到死亡時，我便知曉\r\n我並不在乎別人的疼痛、感受、情緒\r\n就算我對他們揮刀、開槍、勒斃，那對我來說都只是一個過程而已"],
		["並不是，藥廠所開發的藥物只是放大所有感官神經\r\n這也是為什麼其他人會被反嗜的原因，他們會有這些情感導致精神無法承受。\r\n而我毫不在意少了情感的約束，個體將無所不能。", "對這個社會來說，我是。\r\n只是對於適者生存來說\r\n其他人因為這些情感被反嗜，承受不住，不也是一種疾病？\r\n少了情感的約束，個體將無所不能。", "這個藥物並沒有任何控制能力，反而會放大所有感官神經\r\n這也是為什麼其他人會被反嗜的原因，他們會有這些情感導致精神無法承受。\r\n而我毫不在意\r\n少了情感的約束，個體將無所不能。"],
	];