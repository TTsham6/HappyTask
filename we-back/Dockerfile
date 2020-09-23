#######################
# ビルドステージ
#######################
FROM golang:1.13.0 as builder

WORKDIR /app_go

# Go Modulesを使用するための環境変数
ENV GO111MODULE=on

# ユーザーグループとユーザーの設定
RUN groupadd -g 10001 wegroup \
    && useradd -u 10001 -g wegroup weuser

# Moduleをダウンロード
COPY /app_go/go.mod /app_go/go.sum ./
RUN go mod download

COPY /app_go .

# LINUX環境にクロスコンパイル
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags="-w -s" -o /go/bin/app


#######################
# 起動ステージ
#######################
FROM scratch

COPY --from=builder /go/bin/app /go/bin/app
COPY --from=builder /etc/group /etc/group
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.crt

EXPOSE 8080

USER weuser

ENTRYPOINT ["go/bin/app"]
