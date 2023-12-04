import base64
import requests

# API 키 입력
api_key = "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"

# 이미지 인코딩
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# 이미지 경로 입력
image_path = "D:/animal/cat/cat_17.jpg"

# base64형으로 입력
base64_image = encode_image(image_path)

headers = {
  "Content-Type": "application/json",
  "Authorization": f"Bearer {api_key}"
}

payload = {
  "model": "gpt-4-vision-preview",
  "messages": [
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "이미지에 어떤 동물이 있어? 단답으로 대답해줘"
        },
        {
          "type": "image_url",
          "image_url": {
            "url": f"data:image/jpeg;base64,{base64_image}",
            "detail": "low"
          }
        }
      ]
    }
  ],
  "max_tokens": 300
}

response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)

result = response.json()
animal = result['choices'][0]['message']['content']
print(animal)